<?php
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
	if(isset($_POST['email']) && !empty($_POST['email']) && filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
	{
		$email = $_POST['email'];

		$f = fopen("subscription-list.txt", "a");

		if(fwrite($f, $email))
		{
			echo "Congratulation, You have been subscribed successfully.";
		}
		else
		{
			echo "Error! ";
		}
		fclose($f);
	}
	else
	{
		echo 'Invalid email.';
	}
}
?>