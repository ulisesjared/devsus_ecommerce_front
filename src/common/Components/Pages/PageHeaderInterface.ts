export interface PageHeaderProps {
    title?: string;
    backNavigation?: boolean;
    submitButton?: React.ReactNode;
    showSubmitButton?: boolean;
    onSubmit?: () => void;
}