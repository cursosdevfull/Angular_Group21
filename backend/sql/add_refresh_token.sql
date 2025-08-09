-- Agregar campo refreshToken a la tabla user
ALTER TABLE `user` ADD COLUMN `refreshToken` VARCHAR(36) NULL AFTER `password`;

-- Crear índice en refreshToken para mejorar performance
CREATE INDEX idx_refresh_token ON `user`(refreshToken);

-- Opcional: Agregar comentario al campo
ALTER TABLE `user` MODIFY `refreshToken` VARCHAR(36) NULL COMMENT 'UUID para renovar tokens de acceso';
