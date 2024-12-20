-- Author:		Esperanza Romero
-- Description:	Actualiza CartItems
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Cart_Items].[Update]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Cart_Items].[Update]
GO
CREATE PROCEDURE [Cart_Items].[Update]
	@Id				INT,
	@CartId		INT,
	@ProductId		INT,
	@Quantity		INT, 
	@Price			DECIMAL(18,2)
WITH  ENCRYPTION  
AS 
BEGIN	
	UPDATE Cart_Items 
	SET  Cart_Id = @CartId, 
		 Product_Id  = @ProductId,
		 Quantity = @Quantity, 
		 Price = @Price	
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Cart_Items].[Update]';
GO