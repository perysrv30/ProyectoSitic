-- Author:		Esperanza Romero
-- Description:	Obtiene una lista de Productos
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Cart_Items].[GetByAll]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Cart_Items].[GetByAll]
GO
CREATE PROCEDURE [Cart_Items].[GetByAll]
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
END
GO
EXEC sp_recompile N'[Cart_Items].[GetByAll]';
GO