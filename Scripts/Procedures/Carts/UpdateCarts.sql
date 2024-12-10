-- Author:		Esperanza Romero
-- Description:	Actualiza Productos
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Carts].[Update]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Carts].[Update]
GO
CREATE PROCEDURE [Carts].[Update]
	@Id				INT,
	@Total_Price	DECIMAL(18,2)
WITH  ENCRYPTION  
AS 
BEGIN	
	UPDATE Carts 
	SET  Total_Price = @Total_Price
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Carts].[Update]';
GO