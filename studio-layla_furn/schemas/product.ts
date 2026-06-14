export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 } },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
  ]
}
