-- Author:		Esperanza Romero
-- Description:	Obtiene una lista de orden item
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Order_Items].[GetAll]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Order_Items].[GetAll]
GO
CREATE PROCEDURE [Order_Items].[GetAll]
WITH  ENCRYPTION  
AS 
BEGIN	
	SELECT	Id				AS 'Id', 
			Order_Id		AS 'OrderId',  
			Product_Id		AS 'ProductId',  
			Quantity		AS 'Quantity', 
			Price			AS 'Price',  
			Created_At		AS 'CreatedAt', 
			Updated_At		AS 'UpdatedAt' 
	FROM Order_Items
END
GO
EXEC sp_recompile N'[Order_Items].[GetAll]';
GO