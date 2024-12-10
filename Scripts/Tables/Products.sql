IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[NombreTabla]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
	/* Create Tables */
	CREATE TABLE [dbo].[Products]
	(
		[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), -- Identificador único del producto
		[Name] VARCHAR(255) NOT NULL, -- Nombre del producto
		[Description] TEXT NOT NULL,  -- Descripcion detallada del producto
		[Price] DECIMAL(18,2) NOT NULL,  -- Precio del producto
		[Current_Stock] INT NOT NULL,  -- Existencia actual del producto
		[Max_Stock] INT NOT NULL,  -- Existencia máxima permitida
		[Min_Stock] INT NOT NULL,  -- Existencia mínima requerida del producto 
		[Stock_Status_Id] INT NOT NULL,  -- Relacion con la tabla Stock_Status
		[Image_Path] VARCHAR(255) NOT NULL,  -- Ruta de la imagen del producto
		[Created_at] DATETIME DEFAULT GETDATE(),  -- Fecha de creación del producto
		[Updated_at] DATETIME DEFAULT GETDATE() -- Fecha de últoma actualización del producto
		FOREIGN KEY ([Stock_Status_Id]) REFERENCES [dbo].[Stock_Status]([Id])
	)
END


/* Create Table Comments */
IF EXISTS (SELECT * FROM fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', NULL, NULL))
BEGIN
  EXEC sys.sp_updateextendedproperty 'MS_Description', 'Almacena la informacion basica de los productos, asi como la existencia actual y su control', 'SCHEMA', 'dbo', 'table', 'Products'
END 
ELSE
BEGIN
  EXEC sys.sp_addextendedproperty 'MS_Description', 'Almacena la informacion basica de los productos, asi como la existencia actual y su control', 'SCHEMA', 'dbo', 'table', 'Products'
END
GO


/*  Comentarios para las columnas */
/*IF NOT EXISTS(SELECT * FROM Products ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Id'))
	EXEC sp_addextendedproperty 'MS_Description', 'Identificador único del producto', 'Schema', [dbo], 'table', Products, 'column', [Id]*/

-- Comentarios para las columnas en la tabla Products
IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Id'))
	EXEC sp_addextendedproperty 'MS_Description', 'Identificador único del producto', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Id';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Name'))
	EXEC sp_addextendedproperty 'MS_Description', 'Nombre del producto', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Name';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Description'))
	EXEC sp_addextendedproperty 'MS_Description', 'Descripcion detallada del producto', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Description';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Price'))
	EXEC sp_addextendedproperty 'MS_Description', 'Precio del producto', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Price';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Current_Stock'))
	EXEC sp_addextendedproperty 'MS_Description', 'Existencia actual del producto', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Current_Stock';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Max_Stock'))
	EXEC sp_addextendedproperty 'MS_Description', 'Existencia máxima permitida', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Max_Stock';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Min_Stock'))
	EXEC sp_addextendedproperty 'MS_Description', 'Existencia mínima requerida del producto', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Min_Stock';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Stock_Status_Id'))
	EXEC sp_addextendedproperty 'MS_Description', 'Relacion con la tabla Stock_Status', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Stock_Status_Id';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Image_Path'))
	EXEC sp_addextendedproperty 'MS_Description', 'Ruta de la imagen del producto', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Image_Path';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Created_at'))
	EXEC sp_addextendedproperty 'MS_Description', 'Fecha de creación del producto', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Created_at';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Updated_at'))
	EXEC sp_addextendedproperty 'MS_Description', 'Fecha de última actualización del producto', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Updated_at';
