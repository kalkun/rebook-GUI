<?php
	include "head.php";
?>
<body>
	<?php
		include "topbar.php";
	?>
<div id="index" class="block">
	<div class="banner">
		<div>
			<div class="header">
				FIND AND SELL YOUR ACADEMIC BOOKS
			</div>
			<div class="subheader">
				MADE FOR STUDENTS BY STUDENTS
			</div>
			<div class="buttons">
				<div class="find">
					<div class="sale">
						654 books for sale
					</div>
					<button>
						FIND BOOKS
					</button>
				</div>
				<div class="sell">
					<div class="sold">
						1002 books sold
					</div>
					<button>
						SELL BOOKS
					</button>
				</div>
			</div>
		</div>
	</div>
	<?php
		include "modules/tiles.php";
	?>
</div>
	<?php
		include "find.php";
	?>

<footer>
	<?php
	include "modules/footer/footer.php";
	?>
</footer>
<?php
	include "modules/modals/info.html";
?>
</body>
</html>