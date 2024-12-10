IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Product_Configurations].[Insert]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Product_Configurations].[Insert]
GO
CREATE PROCEDURE [Product_Configurations].[Insert]
	@Product_Id				INT,
	@Configuration_Name		VARCHAR(255),
	@Value					VARCHAR(255)
WITH  ENCRYPTION  
AS 
BEGIN	
	INSERT INTO Product_Configurations(Product_Id, Configuration_Name, Value)
	VALUES (@Product_Id, @Configuration_Name, @Value)
END
GO
EXEC sp_recompile N'[Product_Configurations].[Insert]';
GO