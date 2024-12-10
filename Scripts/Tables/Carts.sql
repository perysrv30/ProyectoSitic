IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[Carts]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
    CREATE TABLE [dbo].[Carts] (
        [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), -- Identificador único del carrito
        [Total_Price] DECIMAL(18,2) NOT NULL, -- Precio total del carrito
        [Created_at] DATETIME NOT NULL DEFAULT GETDATE(), -- Fecha de creación del carrito
        [Updated_at] DATETIME NOT NULL DEFAULT GETDATE() -- Fecha de última actualización del carrito
    )
END

-- Agregar propiedades extendidas para la tabla Carts
IF EXISTS (SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Carts', NULL, NULL))
BEGIN
    EXEC sys.sp_updateextendedproperty 'MS_Description', 'Tabla de carritos', 'SCHEMA', 'dbo', 'table', 'Carts'
END
ELSE
BEGIN
    EXEC sys.sp_addextendedproperty 'MS_Description', 'Tabla de carritos', 'SCHEMA', 'dbo', 'table', 'Carts'
END

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Carts', 'column', 'Id'))
    EXEC sp_addextendedproperty 'MS_Description', 'Identificador único del carrito', 'SCHEMA', 'dbo', 'table', 'Carts', 'column', 'Id';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Carts', 'column', 'Total_Price'))
    EXEC sp_addextendedproperty 'MS_Description', 'Precio total del carrito', 'SCHEMA', 'dbo', 'table', 'Carts', 'column', 'Total_Price';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Carts', 'column', 'Created_at'))
    EXEC sp_addextendedproperty 'MS_Description', 'Fecha de creación del carrito', 'SCHEMA', 'dbo', 'table', 'Carts', 'column', 'Created_at';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Carts', 'column', 'Updated_at'))
    EXEC sp_addextendedproperty 'MS_Description', 'Fecha de última actualización del carrito', 'SCHEMA', 'dbo', 'table', 'Carts', 'column', 'Updated_at';

