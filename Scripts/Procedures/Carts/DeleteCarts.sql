-- Author:		Esperanza Romero
-- Description:	Elimina Productos
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Carts].[Delete]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Carts].[Delete]
GO
CREATE PROCEDURE [Carts].[Delete]
	@Id				INT
WITH  ENCRYPTION  
AS 
BEGIN	
	DELETE Carts 
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Carts].[Delete]';
GO