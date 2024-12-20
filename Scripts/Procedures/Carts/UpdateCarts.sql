-- Author:		Esperanza Romero
-- Description:	Actualiza Carts
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Carts].[Update]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Carts].[Update]
GO
CREATE PROCEDURE [Carts].[Update]
	@Id				INT,
	@TotalPrice	DECIMAL(18,2)
WITH  ENCRYPTION  
AS 
BEGIN	
	UPDATE Carts 
	SET  Total_Price = @TotalPrice
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Carts].[Update]';
GO