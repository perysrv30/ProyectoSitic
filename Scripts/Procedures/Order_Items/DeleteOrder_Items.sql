-- Author:		Esperanza Romero
-- Description:	Elimina Productos
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Order_Items].[Delete]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Order_Items].[Delete]
GO
CREATE PROCEDURE [Order_Items].[Delete]
	@Id				INT
WITH  ENCRYPTION  
AS 
BEGIN	
	DELETE Order_Items 
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Order_Items].[Delete]';
GO