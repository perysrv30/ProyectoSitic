-- Author:		Esperanza Romero
-- Description:	Elimina Productos
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Orders].[Delete]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Orders].[Delete]
GO
CREATE PROCEDURE [Orders].[Delete]
	@Id				INT
WITH  ENCRYPTION  
AS 
BEGIN	
	DELETE Orders 
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Orders].[Delete]';
GO