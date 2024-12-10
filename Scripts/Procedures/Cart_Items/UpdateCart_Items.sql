-- Author:		Esperanza Romero
-- Description:	Actualiza Productos
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Cart_Items].[Update]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Cart_Items].[Update]
GO
CREATE PROCEDURE [Cart_Items].[Update]
	@Id				INT,
	@Cart_Id		INT,
	@Product_Id		INT,
	@Quantity		INT, 
	@Price			DECIMAL(18,2)
WITH  ENCRYPTION  
AS 
BEGIN	
	UPDATE Cart_Items 
	SET  Cart_Id = @Cart_Id, 
		 Product_Id  = @Product_Id,
		 Quantity = @Quantity, 
		 Price = @Price	
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Cart_Items].[Update]';
GO