IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[Cart_Items]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
    CREATE TABLE [dbo].[Cart_Items] (
        [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), -- Identificador único del item del carrito
        [Cart_Id] INT NOT NULL, -- Relación con el carrito
        [Product_Id] INT NOT NULL, -- Relación con el producto
        [Quantity] INT NOT NULL, -- Cantidad del producto en el carrito
        [Price] DECIMAL(18,2) NOT NULL, -- Precio del producto al momento de añadir al carrito
        [Created_at] DATETIME NOT NULL DEFAULT GETDATE(), -- Fecha de creación del item en el carrito
        [Updated_at] DATETIME NOT NULL DEFAULT GETDATE(), -- Fecha de última actualización del item en el carrito
        FOREIGN KEY ([Cart_Id]) REFERENCES [dbo].[Carts]([Id]),
        FOREIGN KEY ([Product_Id]) REFERENCES [dbo].[Products]([Id])
    )
END

-- Agregar propiedades extendidas para la tabla Cart_Items
IF EXISTS (SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', NULL, NULL))
BEGIN
    EXEC sys.sp_updateextendedproperty 'MS_Description', 'Items de productos en los carritos', 'SCHEMA', 'dbo', 'table', 'Cart_Items'
END
ELSE
BEGIN
    EXEC sys.sp_addextendedproperty 'MS_Description', 'Items de productos en los carritos', 'SCHEMA', 'dbo', 'table', 'Cart_Items'
END

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'Id'))
    EXEC sp_addextendedproperty 'MS_Description', 'Identificador único del item del carrito', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'Id';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'Cart_Id'))
    EXEC sp_addextendedproperty 'MS_Description', 'Relación con el carrito', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'Cart_Id';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'Product_Id'))
    EXEC sp_addextendedproperty 'MS_Description', 'Relación con el producto', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'Product_Id';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'Quantity'))
    EXEC sp_addextendedproperty 'MS_Description', 'Cantidad del producto en el carrito', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'Quantity';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'Price'))
    EXEC sp_addextendedproperty 'MS_Description', 'Precio del producto al momento de añadir al carrito', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'Price';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'Created_at'))
    EXEC sp_addextendedproperty 'MS_Description', 'Fecha de creación del item en el carrito', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'Created_at';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'Updated_at'))
    EXEC sp_addextendedproperty 'MS_Description', 'Fecha de última actualización del item en el carrito', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'Updated_at';
