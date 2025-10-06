
export function formatDate({ data, dateStyle = 'medium' }: { data: string | null, dateStyle?: "medium" | "full" | "long" | "short" }) {
   let value = ""
   if (data === null) return value
   const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   value = new Intl.DateTimeFormat('es', {
      dateStyle: dateStyle,
      timeZone: userTimeZone,
   }).format(new Date(data));

   return value
}

export function formatDateTime({ data, dateStyle = 'medium', timeStyle = 'medium' }: { data: string | null, dateStyle?: "medium" | "full" | "long" | "short", timeStyle?: "medium" | "full" | "long" | "short" }) {
   let value = ""
   if (data === null) return value
   value = new Intl.DateTimeFormat('es', {
      dateStyle: dateStyle,
      timeStyle: timeStyle,
      // timeZone: 'America/Mexico_City',// TODO: UTC | userTimeZone,
   }).format(new Date(data));

   return value
}

export const toLocalDate = (date?: Date | string) => {
   if(!date) return null
   const local = window?.navigator?.language || 'es-ES'
   return new Date(date).toLocaleDateString(local, {
      month: "long",
      day: "2-digit",
      year: "2-digit"
   })
}

export const getErrorMessage = (error: any) => {
   const statusCode = error?.response?.status || null
   if (statusCode >= 500) {
      return "An error has occurred with the server"
   }
   let errObj = error?.response || null
   if (errObj) {
      const messages: string | unknown = Object.values(error.response.data)
         .reduce((acc, curr: any) => acc + `${curr.toString()}\n `, "")

      if (typeof messages === 'string' && messages.length > 0 && messages.length < 140)
         return messages
   }
   return "An error has occurred while processing the request"
}

export const reportDate = (date: string) => {
   const parts = date.split(' ')
   if (parts[1].length === 2) parts[1] = '0' + parts[1]
   return parts.reduce((acc, str) => acc + '-' + str)
}

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));


export const appendFormData = (data: any, fileKeys: string[]) => {
   const formData = new FormData()
   Object.entries(data).forEach(([key, value]) => {
      if (fileKeys.includes(key)) {
         if (value instanceof File) formData.append(key, value);
         return;
      }
      if (typeof value === 'object' && value !== null) {
         formData.append(key, JSON.stringify(value))
         return;
      }
      formData.append(key, String(value))
   })
   return formData
}


export const formatCurrency = (value: number) => {
   return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,

   }).format(value)
}

export const setDayTime: (date: Date, mode: 'start' | 'end') => Date = (date, mode) => {
   if (mode === 'start') {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate())
   }
   return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)
}