-- Author:		Esperanza Romero
-- Description:	Obtiene una lista de Productos
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Product_Configurations].[GetByAll]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Product_Configurations].[GetByAll]
GO
CREATE PROCEDURE [Product_Configurations].[GetByAll]
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
END
GO
EXEC sp_recompile N'[Product_Configurations].[GetByAll]';
GO