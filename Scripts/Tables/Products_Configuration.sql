IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[Product_Configurations]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
	/* Create Tables */
	CREATE TABLE [dbo].[Product_Configurations]
	(
		[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), -- identificador único de la configuracion
		[Product_Id] INT NOT NULL, -- Relacion con el producto
		[Configuration_Name] VARCHAR(255) NOT NULL, -- Nombre de la configuracion
		[Value] VARCHAR(255) NOT NULL, -- Valor de la configuracion
		[Created_at] DATETIME NOT NULL DEFAULT GETDATE(), -- Fecha de Creacion de la configuracion
		[Updated_at] DATETIME NOT NULL DEFAULT GETDATE(), -- Fecha de actualizacion de la configuracion
		FOREIGN KEY ([Product_Id]) REFERENCES [dbo].[Products]([Id])
		
	)
END


/* Create Table Comments */
IF EXISTS (SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Product_Configurations', NULL, NULL))
BEGIN
  EXEC sys.sp_updateextendedproperty 'MS_Description', 'Define las configuraciones especificas para los productos', 'SCHEMA', 'dbo', 'table', 'Product_Configurations'
END 
ELSE
BEGIN
  EXEC sys.sp_addextendedproperty 'MS_Description', 'Define las configuraciones especificas para los productos', 'SCHEMA', 'dbo', 'table', 'Product_Configurations'
END
GO

/*  Comentarios para las columnas */
IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Product_Configuration', 'column', 'Id'))
	EXEC sp_addextendedproperty 'MS_Description', 'Identificador único de la configuración', 'SCHEMA', 'dbo', 'table', 'Product_Configuration', 'column', 'Id';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Product_Configuration', 'column', 'Product_Id'))
	EXEC sp_addextendedproperty 'MS_Description', 'Relación con el producto', 'SCHEMA', 'dbo', 'table', 'Product_Configuration', 'column', 'Product_Id';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Product_Configuration', 'column', 'Configuration_Name'))
	EXEC sp_addextendedproperty 'MS_Description', 'Nombre de la configuración', 'SCHEMA', 'dbo', 'table', 'Product_Configuration', 'column', 'Configuration_Name';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Product_Configuration', 'column', 'Value'))
	EXEC sp_addextendedproperty 'MS_Description', 'Valor de la configuración', 'SCHEMA', 'dbo', 'table', 'Product_Configuration', 'column', 'Value';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Product_Configuration', 'column', 'Created_at'))
	EXEC sp_addextendedproperty 'MS_Description', 'Fecha de creación de la configuración', 'SCHEMA', 'dbo', 'table', 'Product_Configuration', 'column', 'Created_at';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Product_Configuration', 'column', 'Update_at'))
	EXEC sp_addextendedproperty 'MS_Description', 'Fecha de actualización de la configuración', 'SCHEMA', 'dbo', 'table', 'Product_Configuration', 'column', 'Update_at';