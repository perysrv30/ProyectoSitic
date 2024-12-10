IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Carts].[Insert]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Carts].[Insert]
GO
CREATE PROCEDURE [Carts].[Insert]
	@Total_Price	DECIMAL(18,2)
WITH  ENCRYPTION  
AS 
BEGIN	
	INSERT INTO Carts(Total_Price)
	VALUES (@Total_Price)
END
GO
EXEC sp_recompile N'[Carts].[Insert]';
GO