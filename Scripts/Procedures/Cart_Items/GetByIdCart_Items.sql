-- Author:		Esperanza Romero
-- Description:	Obtiene un Producto por un Id
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Cart_Items].[GetById]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Cart_Items].[GetById]
GO
CREATE PROCEDURE [Cart_Items].[GetById]
	@Id				INT
WITH  ENCRYPTION  
AS 
BEGIN	
	SELECT	Id				AS 'Id', 
			Cart_Id			AS 'CartId',  
			Product_Id		AS 'ProductId',  
			Quantity		AS 'Quantity', 
			Price			AS 'Price',  
			Created_At		AS 'CreatedAt', 
			Updated_At		AS 'UpdatedAt' 
	FROM Cart_Items
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Cart_Items].[GetById]';
GO