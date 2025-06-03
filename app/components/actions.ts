// app/actions.ts
'use server'

export async function searchAction(formData: FormData) {
  const q = formData.get('query')
  console.log('Sunucuda gelen sorgu:', q)
}