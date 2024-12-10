-- Author:		Esperanza Romero
-- Description:	Elimina Productos
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Cart_Items].[Delete]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Cart_Items].[Delete]
GO
CREATE PROCEDURE [Cart_Items].[Delete]
	@Id				INT
WITH  ENCRYPTION  
AS 
BEGIN	
	DELETE Cart_Items 
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Cart_Items].[Delete]';
GO