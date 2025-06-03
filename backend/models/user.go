package models

import "time"

type User struct {
	ID              uint64    `json:"id"`
	Nombre          string    `json:"nombre"`
	ApellidoPaterno string    `json:"apellido_paterno"`
	ApellidoMaterno string    `json:"apellido_materno"`
	Correo          string    `json:"correo"`
	Contrasena      string    `json:"contrasena"`
	Celular         string    `json:"celular"`
	FechaRegistro   time.Time `json:"fecha_registro"`
	Activo          bool      `json:"activo"`
}
