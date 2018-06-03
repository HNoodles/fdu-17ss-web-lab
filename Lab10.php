<?php
//Fill this place

//****** Hint ******
//connect database and fetch data here
define('DBHOST', 'localhost');
define('DBNAME', 'travel');
define('DBUSER', 'root');
define('DBPASS', '');

$connection = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME);
if ( mysqli_connect_errno() ) {
    die( mysqli_connect_error() );
}

$sqlContinents = 'select * from Continents order by ContinentCode';
$sqlCountries = 'select * from Countries order by ISO';
$sqlImageDetails = 'select * from ImageDetails order by ImageID';

$resultContinents = mysqli_query($connection, $sqlContinents);
$resultCountries = mysqli_query($connection, $sqlCountries);
$resultImageDetails = mysqli_query($connection, $sqlImageDetails);


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Chapter 14</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="css/bootstrap.min.css" />
    
    

    <link rel="stylesheet" href="css/captions.css" />
    <link rel="stylesheet" href="css/bootstrap-theme.css" />    

</head>

<body>
    <?php include 'header.inc.php'; ?>
    


    <!-- Page Content -->
    <main class="container">
        <div class="panel panel-default">
          <div class="panel-heading">Filters</div>
          <div class="panel-body">
            <form action="Lab10.php" method="get" class="form-horizontal">
              <div class="form-inline">
              <select name="continent" class="form-control">
                <option value="0">Select Continent</option>
                <?php
                //Fill this place

                //****** Hint ******
                //display the list of continents
                while($rowContinents = $resultContinents->fetch_assoc()) {
                  echo '<option value=' . $rowContinents['ContinentCode'] . '>' . $rowContinents['ContinentName'] . '</option>';
                }

                mysqli_free_result($resultContinents);
                ?>
              </select>     
              
              <select name="country" class="form-control">
                <option value="0">Select Country</option>
                <?php 
                //Fill this place

                //****** Hint ******
                /* display list of countries */
                while ($rowCountries = $resultCountries -> fetch_assoc()) {
                    echo '<option value=' . $rowCountries['ISO'] . '>' . $rowCountries['CountryName'] . '</option>';
                }

                mysqli_free_result($resultCountries);
                ?>
              </select>    
              <input type="text"  placeholder="Search title" class="form-control" name=title>
              <button type="submit" name="filter" class="btn btn-primary">Filter</button>
              </div>
            </form>

          </div>
        </div>     
                                    

		<ul class="caption-style-2">
            <?php 
            //Fill this place

            //****** Hint ******
//            use while loop to display images that meet requirements ... sample below ... replace ???? with field data
            function echoImage($row) {
                echo '<li>
              <a href="detail.php?id='.$row['ImageID'].'" class="img-responsive">
                <img src="images/square-medium/'.$row['Path'].'" alt="'.$row['Title'].'">
                <div class="caption">
                  <div class="blur"></div>
                  <div class="caption-text">
                    <p>'.$row['Title'].'</p>
                  </div>
                </div>
              </a>
            </li>';
            }

            while ($rowImageDetails = $resultImageDetails -> fetch_assoc()){
                if (isset($_GET['filter'])) {
                    // filter button clicked
                    $continent = $_GET['continent'];
                    $country = $_GET['country'];
                    if ($continent !== "0") {
                        // continent set
                        if ($country !== "0") {
                            // continent set, country set
                            if (($rowImageDetails['ContinentCode'] === $continent)
                                && ($rowImageDetails['CountryCodeISO'] === $country)){
                                echoImage($rowImageDetails);
                            }

                        } else {
                            // continent set, country not set
                            if ($rowImageDetails['ContinentCode'] === $continent)
                                echoImage($rowImageDetails);
                        }
                    } else {
                        // continent not set
                        if ($country !== "0") {
                            // continent not set, country set
                            if (($rowImageDetails['CountryCodeISO'] === $country))
                                echoImage($rowImageDetails);
                        } else {
                            // continent not set, country not set
                            echoImage($rowImageDetails);
                        }
                    }
                } else {
                    // filter button not clicked
                    echoImage($rowImageDetails);
                }
            }

            ?>
       </ul>       

      
    </main>
    
    <footer>
        <div class="container-fluid">
                    <div class="row final">
                <p>Copyright &copy; 2017 Creative Commons ShareAlike</p>
                <p><a href="#">Home</a> / <a href="#">About</a> / <a href="#">Contact</a> / <a href="#">Browse</a></p>
            </div>            
        </div>
        

    </footer>


        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
</body>

</html>