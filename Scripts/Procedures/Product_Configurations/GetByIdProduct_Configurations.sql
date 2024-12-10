-- Author:		Esperanza Romero
-- Description:	Obtiene un Producto por un Id
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Product_Configurations].[GetById]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Product_Configurations].[GetById]
GO
CREATE PROCEDURE [Product_Configurations].[GetById]
	@Id				INT
WITH  ENCRYPTION  
AS 
BEGIN	
	SELECT	Id						AS 'Id', 
			Product_Id				AS 'ProductId',  
			Configuration_Name		AS 'ConfigurationName', 
			Value					AS 'Value',  
			Created_At				AS 'CreatedAt', 
			Update_At				AS 'UpdateAt' 
	FROM Product_Configurations
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Product_Configurations].[GetById]';
GO