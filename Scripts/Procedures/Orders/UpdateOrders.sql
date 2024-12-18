-- Author:		Esperanza Romero
-- Description:	Actualiza Ordenes
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Orders].[Update]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Orders].[Update]
GO
CREATE PROCEDURE [Orders].[Update]
	@Id				INT,
	@TotalPrice		DECIMAL(18,2),
	@Status			VARCHAR(50)
WITH  ENCRYPTION  
AS 
BEGIN	
	UPDATE Orders 
	SET  Total_Price = @TotalPrice,
		 Status = @Status
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Orders].[Update]';
GO