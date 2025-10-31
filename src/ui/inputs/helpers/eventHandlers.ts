import * as React from "react";

type NumericOptions = {
    allowDecimal?: boolean;
    allowNegative?: boolean;
    maxIntegerDigits?: number;   // e.g. 9 → up to 999,999,999
    maxFractionDigits?: number;  // e.g. 2 → cents
    decimalSeparator?: "." | ","; // accept and normalize this to "."
};

const NAV_KEYS = new Set([
    "Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"
]);

const isShortcut = (e: React.KeyboardEvent<HTMLInputElement>) =>
    (e.ctrlKey || e.metaKey) && ["a", "c", "v", "x", "z", "y"].includes(e.key.toLowerCase());

/** sanitize any text to a valid numeric string per options */
export function sanitizeNumeric(input: string, opts: NumericOptions): string {
    const {
        allowDecimal = false,
        allowNegative = false,
        maxIntegerDigits,
        maxFractionDigits,
        decimalSeparator = ".",
    } = opts;

    // Normalize decimal separator to "."
    const sep = decimalSeparator;
    let s = input.replace(/\s+/g, "").replace(sep, ".");

    // Keep only digits, dot, optional leading minus
    s = s.replace(/[^\d.-]/g, "");

    // Handle minus (only one, only at start if allowed)
    if (!allowNegative) s = s.replace(/-/g, "");
    else {
        s = s.replace(/(?!^)-/g, ""); // remove any minus not at start
    }

    // Handle decimals
    if (!allowDecimal) {
        s = s.replace(/\./g, "");
    } else {
        // Only first dot, remove others
        const firstDot = s.indexOf(".");
        if (firstDot !== -1) {
            s = s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, "");
        }
    }

    // Split integer/fraction to enforce digit caps
    let sign = "";
    if (allowNegative && s.startsWith("-")) {
        sign = "-";
        s = s.slice(1);
    }

    let [intPart, fracPart = ""] = s.split(".");
    intPart = intPart.replace(/^0+(?=\d)/, ""); // strip leading zeros (keep one zero if alone)

    if (maxIntegerDigits && intPart.length > maxIntegerDigits) {
        intPart = intPart.slice(0, maxIntegerDigits);
    }

    if (allowDecimal && maxFractionDigits !== undefined && maxFractionDigits >= 0) {
        fracPart = fracPart.slice(0, maxFractionDigits);
    } else if (!allowDecimal) {
        fracPart = "";
    }

    const body = allowDecimal && fracPart.length > 0 ? `${intPart}.${fracPart}` : intPart;
    const out = sign + body;

    // Allow just "-" or "." while typing? Usually no; fallback to empty or "0."
    if (out === "-" && !allowNegative) return "";
    if (out === "-" || out === ".") return out === "." && allowDecimal ? "0." : "";

    return out;
}

/** Hook returning stable handlers + props to wire up an <input> */
export function useNumericInput(opts: NumericOptions) {
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (NAV_KEYS.has(e.key) || isShortcut(e)) return;

        if (e.key === "Process" || e.key === "Unidentified") return;

        // Let IME/mobile finish composition; we’ll sanitize later
        if (e.nativeEvent.isComposing) return;


        // Optional lightweight guard for obvious non-printable keys:
        if (e.key.length > 1) return;

        // For immediate key filtering (helps desktop):
        const next = sanitizeNumeric((e.currentTarget.value + e.key), opts);
        // If adding this key wouldn’t change to a valid progression, block it.
        // This is heuristic; main correctness is in beforeinput/paste sanitization.
        if (!next.includes(e.key) && !/\d/.test(e.key)) {
            e.preventDefault();
        }
    };

    const onBeforeInput = (e: React.FormEvent<HTMLInputElement> & { data?: string; inputType?: string; }) => {
        // For browsers that support it (most Chromium): block invalid insertText early
        const target = e.target as HTMLInputElement;
        const { selectionStart, selectionEnd, value } = target;

        const data = (e as any).data as string | undefined;
        if ((e as any).inputType !== "insertText" || data == null) return;

        const next =
            value.slice(0, selectionStart ?? value.length) +
            data +
            value.slice(selectionEnd ?? value.length);

        const sanitized = sanitizeNumeric(next, opts);
        if (sanitized !== next) {
            (e as any).preventDefault?.();
        }
    };

    const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const target = e.currentTarget;
        const paste = e.clipboardData.getData("text");

        const { selectionStart, selectionEnd, value } = target;
        const next =
            value.slice(0, selectionStart ?? value.length) +
            paste +
            value.slice(selectionEnd ?? value.length);

        const sanitized = sanitizeNumeric(next, opts);
        target.setRangeText(sanitized, 0, value.length, "end"); // replace entire value to keep simple
        // Fire input event to let React/parent pick it up if you’re controlled
        const ev = new Event("input", { bubbles: true });
        target.dispatchEvent(ev);
    };

    return { onKeyDown, onBeforeInput, onPaste };
}
