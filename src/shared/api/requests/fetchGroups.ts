import { Group, RawDBItem } from "../types"

export const fetchGroups = async () => {
  const res = await fetch('http://127.0.0.1:23456/api/groups')
  const data: RawDBItem[] = await res.json()

  const groupedData = data.reduce<{ [key: number]: Group }>((acc, item) => {
    const { group_id, group_name, node_id, node_name, node_status_color, node_status_description, interface_id, interface_name, interface_status, admin_id, admin_name, app_id, app_name } = item

    if (!acc[group_id]) {
      acc[group_id] = {
        group_id,
        group_name,
        nodes: [],
      }
    }

    acc[group_id].nodes.push({
      node_id,
      node_name,
      node_status_color,
      node_status_description,
      interfaces: 
        {
          interface_id,
          interface_name,
          interface_status,
        },
      admin: {
        admin_id,
        admin_name,
      },
      applications: [
        {
          app_id,
          app_name,
        },
      ],
    })

    return acc
  }, {})

  return Object.values(groupedData)
}