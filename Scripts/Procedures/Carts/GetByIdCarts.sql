-- Author:		Esperanza Romero
-- Description:	Obtiene un Producto por un Id
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Carts].[GetById]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Carts].[GetById]
GO
CREATE PROCEDURE [Carts].[GetById]
	@Id				INT
WITH  ENCRYPTION  
AS 
BEGIN	
	SELECT	Id				AS 'Id', 
			Total_Price		AS 'TotalPrice',
			Created_At		AS 'CreatedAt', 
			Updated_At		AS 'UpdatedAt' 
	FROM Carts
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Carts].[GetById]';
GO