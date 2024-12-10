-- Crear tabla Orders
IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[Orders]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
    CREATE TABLE [dbo].[Orders] (
        [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), -- Identificador único de la orden
        [Total_Price] DECIMAL(18,2) NOT NULL, -- Precio total del pedido
        [Status] VARCHAR(50) NOT NULL, -- Estado del pedido (ej. pendiente, enviado, completado)
        [Created_at] DATETIME NOT NULL DEFAULT GETDATE(), -- Fecha de creación del pedido
        [Updated_at] DATETIME NOT NULL DEFAULT GETDATE() -- Fecha de última actualización del pedido
    )
END

-- Agregar propiedades extendidas para la tabla Orders
IF EXISTS (SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Orders', NULL, NULL))
BEGIN
    EXEC sys.sp_updateextendedproperty 'MS_Description', 'Tabla de órdenes', 'SCHEMA', 'dbo', 'table', 'Orders'
END
ELSE
BEGIN
    EXEC sys.sp_addextendedproperty 'MS_Description', 'Tabla de órdenes', 'SCHEMA', 'dbo', 'table', 'Orders'
END

--Comentarios
IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Id'))
    EXEC sp_addextendedproperty 'MS_Description', 'Identificador único de la orden', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Id';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Total_Price'))
    EXEC sp_addextendedproperty 'MS_Description', 'Precio total del pedido', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Total_Price';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Status'))
    EXEC sp_addextendedproperty 'MS_Description', 'Estado del pedido (ej. pendiente, enviado, completado)', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Status';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Created_at'))
    EXEC sp_addextendedproperty 'MS_Description', 'Fecha de creación del pedido', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Created_at';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Updated_at'))
    EXEC sp_addextendedproperty 'MS_Description', 'Fecha de última actualización del pedido', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Updated_at';
