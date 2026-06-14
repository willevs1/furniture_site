import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas/schema'

export default defineConfig({
  projectId: '9e742a80',
  dataset: 'production',
  title: 'layla_furn Studio',
  apiVersion: '2026-06-14',
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: { types: schemaTypes }
})
