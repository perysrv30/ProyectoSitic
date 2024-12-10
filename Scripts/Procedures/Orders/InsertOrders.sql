IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Orders].[Insert]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Orders].[Insert]
GO
CREATE PROCEDURE [Orders].[Insert]
	@Total_Price	DECIMAL(18,2),
	@Status			VARCHAR(50)
WITH  ENCRYPTION  
AS 
BEGIN	
	INSERT INTO Orders(Total_Price, Status)
	VALUES (@Total_Price, @Status)
END
GO
EXEC sp_recompile N'[Orders].[Insert]';
GO