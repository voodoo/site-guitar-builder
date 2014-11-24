<?php

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
	if(isset($_POST['email']) && !empty($_POST['email']) && filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
	{
			$name = $_POST['name'];
			$from = $_POST['email'];
			$message = $_POST['message'];

			$headers = "MIME-Version: 1.0\r\n";
			$headers .= "From: {$_POST['name']} "
			             ."<{$_POST['email']}>\r\n";
			$headers .= 'Reply-To: '.$_POST['email']."\r\n";
			$headers .= 'Content-Type: text/plain; charset="iso-8859-1"';
			$headers .= "\r\nContent-Transfer-Encoding: 8bit\r\n";
			$headers .= 'X-Mailer:PHP/' . phpversion()."\r\n";

			$mail_corps = "Name : $name\n";
			$mail_corps .= "Email : $email\n";
			$mail_corps .= "Message : $message\n\n";
			$mail_corps .= "fakia Landing Page is the best way to present your beautiful mobile app. made by Qawba © Copyright 2014 Qawba.com . All rights reserved.  \n";


			$to = 'myemail@mail.com'; // remplace it with your email

			/*if(mail('info.qawba@gmail.com',$subject,$email))*/
			if (mail($to, $message, $mail_corps, $headers))
			{
				echo '<div class="alert alert-success">
			    <button type="button" class="close" data-dismiss="alert">&times;</button>
			    <strong>Thank you</strong>, your message has been sent successfully.
			    </div>';

			}
			else
			{
				echo '<div class="alert alert-error">Error! </div>';
			}

	}
	else
	{
		echo '<div class="alert alert-error">
		<button type="button" class="close" data-dismiss="alert">&times;</button>
		<strong>Warning!</strong> Invalid email.
		</div>';
	}

}

?>