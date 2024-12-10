IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[Order_Items]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
    CREATE TABLE [dbo].[Order_Items] (
        [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), -- Identificador único del item en la orden
        [Order_Id] INT NOT NULL, -- Relación con la orden
        [Product_Id] INT NOT NULL, -- Relación con el producto
        [Quantity] INT NOT NULL, -- Cantidad del producto en el pedido
        [Price] DECIMAL(18,2) NOT NULL, -- Precio del producto al momento del pedido
        [Created_at] DATETIME NOT NULL DEFAULT GETDATE(), -- Fecha de creación del item en el pedido
        [Updated_at] DATETIME NOT NULL DEFAULT GETDATE(), -- Fecha de última actualización del item en el pedido
        FOREIGN KEY ([Order_Id]) REFERENCES [dbo].[Orders]([Id]),
        FOREIGN KEY ([Product_Id]) REFERENCES [dbo].[Products]([Id])
    )
END

-- Agregar propiedades extendidas para la tabla Order_Items
IF EXISTS (SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', NULL, NULL))
BEGIN
    EXEC sys.sp_updateextendedproperty 'MS_Description', 'Items de productos en las órdenes', 'SCHEMA', 'dbo', 'table', 'Order_Items'
END
ELSE
BEGIN
    EXEC sys.sp_addextendedproperty 'MS_Description', 'Items de productos en las órdenes', 'SCHEMA', 'dbo', 'table', 'Order_Items'
END

/* Comentarios para las columnas en la tabla Order_Items */
IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'Id'))
    EXEC sp_addextendedproperty 'MS_Description', 'Identificador único del item en la orden', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'Id';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'Order_Id'))
    EXEC sp_addextendedproperty 'MS_Description', 'Relación con la orden', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'Order_Id';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'Product_Id'))
    EXEC sp_addextendedproperty 'MS_Description', 'Relación con el producto', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'Product_Id';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'Quantity'))
    EXEC sp_addextendedproperty 'MS_Description', 'Cantidad del producto en el pedido', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'Quantity';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'Price'))
    EXEC sp_addextendedproperty 'MS_Description', 'Precio del producto al momento del pedido', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'Price';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'Created_at'))
    EXEC sp_addextendedproperty 'MS_Description', 'Fecha de creación del item en el pedido', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'Created_at';

IF NOT EXISTS (SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'Updated_at'))
    EXEC sp_addextendedproperty 'MS_Description', 'Fecha de última actualización del item en el pedido', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'Updated_at';