IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[Stock_Status]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
	/* Create Tables */
	CREATE TABLE [dbo].[Stock_Status]
	(
		[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), -- identificador único del estado
		[Status_Name] VARCHAR(50) NOT NULL, -- Nombre del estado de existencia 
		[Key] VARCHAR(50) NOT NULL, -- Clave del estado
	)
END


/* Create Table Comments */
IF EXISTS (SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Stock_Status', NULL, NULL))
BEGIN
  EXEC sys.sp_updateextendedproperty 'MS_Description', 'Almacenar los diferentes estados de existencia', 'SCHEMA', 'dbo', 'table', 'Stock_Status'
END 
ELSE
BEGIN
  EXEC sys.sp_addextendedproperty 'MS_Description', 'AgregaDescripción', 'SCHEMA', 'dbo', 'table', 'Stock_Status'
END
GO


/*  Comentarios para las columnas */
IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Stock_Status', 'column', 'Id'))
	EXEC sp_addextendedproperty 'MS_Description', 'Identificador único del estado', 'SCHEMA', 'dbo', 'table', 'Stock_Status', 'column', 'Id';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Stock_Status', 'column', 'Status_Name'))
	EXEC sp_addextendedproperty 'MS_Description', 'Nombre del estado de existencia', 'SCHEMA', 'dbo', 'table', 'Stock_Status', 'column', 'Status_Name';

IF NOT EXISTS(SELECT * FROM fn_listextendedproperty('MS_Description', 'SCHEMA', 'dbo', 'table', 'Stock_Status', 'column', 'Key'))
	EXEC sp_addextendedproperty 'MS_Description', 'Clave del estado', 'SCHEMA', 'dbo', 'table', 'Stock_Status', 'column', 'Key';
