-- Author:		Esperanza Romero
-- Description:	Obtiene una lista de Productos
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Order_Items].[GetById]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Order_Items].[GetById]
GO
CREATE PROCEDURE [Order_Items].[GetById]
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
EXEC sp_recompile N'[Order_Items].[GetById]';
GO