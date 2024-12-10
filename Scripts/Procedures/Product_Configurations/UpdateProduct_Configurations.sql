-- Author:		Esperanza Romero
-- Description:	Actualiza Productos
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Product_Configurations].[Update]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Product_Configurations].[Update]
GO
CREATE PROCEDURE [Product_Configurations].[Update]
	@Id						INT,
	@Product_id				INT,
	@Configuration_Name		VARCHAR(255),
	@Value					VARCHAR(255)
WITH  ENCRYPTION  
AS 
BEGIN	
	UPDATE Product_Configurations
	SET
		 Product_Id  = @Product_Id,
		 Configuration_Name = @Configuration_Name, 
		 Value = @Value
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Product_Configurations].[Update]';
GO