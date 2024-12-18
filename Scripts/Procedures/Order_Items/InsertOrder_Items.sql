IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Order_Items].[Insert]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Order_Items].[Insert]
GO
CREATE PROCEDURE [Order_Items].[Insert]
	@OrderId		INT,
	@ProductId		INT,
	@Quantity		INT, 
	@Price			DECIMAL(18,2)
WITH  ENCRYPTION  
AS 
BEGIN	
	INSERT INTO Order_Items(Order_Id, Product_Id, Quantity, Price)
	VALUES (@OrderId, @ProductId, @Quantity, @Price)
END
GO
EXEC sp_recompile N'[Order_Items].[Insert]';
GO