SELECT 
  metrics.id,
  metrics.datetime,
  metrics.cpu_utilization,
  metrics.memory_utilization,
  metrics.disk_utilization,
  nodes.id,
  nodes.caption,
  statuses.color,
  statuses.description
FROM metrics
LEFT JOIN nodes ON nodes.id = metrics.node_id
LEFT JOIN statuses ON statuses.id = nodes.status;
