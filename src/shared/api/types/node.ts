export type Node={
  node_id: number
  node_name: string
  node_status_color: string
  node_status_description: string
  interfaces: { interface_id: number; interface_name: string; interface_status: string }
  admin: { admin_id: number; admin_name: string }
  applications: { app_id: number; app_name: string }[]
}