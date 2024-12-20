IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Cart_Items].[Insert]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Cart_Items].[Insert]
GO
CREATE PROCEDURE [Cart_Items].[Insert]
	@CartId		INT,
	@ProductId		INT,
	@Quantity		INT, 
	@Price			DECIMAL(18,2)
WITH  ENCRYPTION  
AS 
BEGIN	
	INSERT INTO Cart_Items(Cart_Id, Product_Id, Quantity, Price)
	VALUES (@CartId, @ProductId, @Quantity, @Price)
END
GO
EXEC sp_recompile N'[Cart_Items].[Insert]';
GO