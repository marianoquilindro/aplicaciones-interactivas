\
Write-Host "Demo API Gestor de Tareas - inicio"

$api = "http://localhost:3000"

Write-Host "`n1) Crear usuario"
curl -X POST $api/usuarios -H "Content-Type: application/json" -d "{\"nombre\":\"Mariano\",\"correo\":\"mariano@example.com\"}"

Write-Host "`n2) Crear equipo (creado_por = 1)"
curl -X POST $api/equipos -H "Content-Type: application/json" -d "{\"nombre\":\"Equipo Interactivas\",\"creado_por\":1}"

Write-Host "`n3) Crear etiqueta"
curl -X POST $api/etiquetas -H "Content-Type: application/json" -d "{\"nombre\":\"Urgente\",\"color\":\"red\"}"

Write-Host "`n4) Crear tarea (creador_id=1, equipo_id=1)"
curl -X POST $api/tareas -H "Content-Type: application/json" -d "{\"titulo\":\"Entrega inicial\",\"descripcion\":\"TP integrador\",\"creador_id\":1,\"equipo_id\":1,\"prioridad\":1,\"fecha_vencimiento\":\"2025-12-01\"}"

Write-Host "`n5) Listar tareas"
curl $api/tareas

Write-Host "`n6) Cambiar estado de tarea 1 a EN_PROGRESO"
curl -X POST $api/tareas/1/cambiar-estado -H "Content-Type: application/json" -d "{\"nuevoEstado\":\"EN_PROGRESO\",\"usuarioId\":1}"

Write-Host "`n7) Asociar etiqueta 1 a tarea 1"
curl -X POST $api/etiquetas/tareas/1 -H "Content-Type: application/json" -d "{\"etiquetaId\":1}"

Write-Host "`n8) Consultar actividad usuario 1"
curl "$api/actividad?usuarioId=1"

Write-Host "`nDemo finalizada`n"
