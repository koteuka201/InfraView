SELECT 
  g.id AS group_id,
  g.caption AS group_name,
  n.id AS node_id,
  n.caption AS node_name,
  s.color AS node_status_color,
  s.description AS node_status_description,
  i.id AS interface_id,
  i.caption AS interface_name,
  i.status AS interface_status,
  u.id AS admin_id,
  u.firstname || ' ' || u.lastname AS admin_name,
  app.id AS app_id,
  app.caption AS app_name
FROM groups g
LEFT JOIN groups_nodes gn ON gn.group_id = g.id
LEFT JOIN nodes n ON n.id = gn.node_id
LEFT JOIN statuses s ON s.id = n.status
LEFT JOIN interfaces i ON i.id = n.interface
LEFT JOIN users u ON u.id = n.admin
LEFT JOIN nodes_applications na ON na.node_id = n.id
LEFT JOIN applications app ON app.id = na.application_id
ORDER BY g.id, n.id;
