# Project Overview

This project aims to develop a simple, serverless Online Store with Google Sheet API.

Disclaimer: Forked from [codeyourventurefree/google_sheet_shop](https://github.com/codeyourventurefree/google_sheet_shop)

# Demo

Online Store : http://google-sheet-shop-dev.s3-website-ap-southeast-1.amazonaws.com/

Layout Setting : https://drive.google.com/open?id=1tQI0Z3_Tk1YtTrtBESHgf4lKgYxKx1eIGYOVNh9-O_k

Products : https://drive.google.com/open?id=1vcZ7BNqyAOA5AZWm7oyhMPy1Bh3pGP-atUfw13db3Yw

# Installation
https://medium.com/@codeyourventurefree/build-an-online-store-for-free-with-google-sheet-part-1-wip-fcaa72834d22

## Step 1, register a Google and AWS account. 
They are the prerequisite for the whole application. All we need are the 15GB storage on Google Drive and 5GB free tier from AWS S3.

Google Drive : https://www.google.com/drive/

AWS : https://aws.amazon.com/

## Step 2, cloning the template from my Google Drive to yours and generate an API key via the Google Cloud Services.

Google Drive Template : https://drive.google.com/open?id=1ZmOCfo22sAhplMh5AAoItxuy2eYdnooi

Google Sheet API : https://console.developers.google.com/flows/enableapi?apiid=sheets.googleapis.com


## Step 3, download the files from GitHub and unzip all them. 
Amend the env.js file with any text editor. Replace the API key that you generated from Google Cloud Service, the layout sheet id, and product sheet id respectively.

## Step 4, build the script.
Open your terminal. Go to the root directory of the folder that you downloaded from Github. Run the command "NPM install" and then run another command "NPM build"afterward. Bear in mind that the prerequisite of this step is to install NodeJs and NPM on your computer. If you don't have any idea about them, please check out the tutorial in the description link below.

Prerequisite - How to install NodeJS and NPM :

Windows : https://www.youtube.com/watch?v=epH81xhS6mk

Mac : https://www.youtube.com/watch?annotation_id=annotation_3330403137&feature=iv&src_vid=epH81xhS6mk&v=BIVfpvPnU0U

## Step 5, create an S3 bucket on Amazon. 
Drag and drop all the files in the build directory to the bucket, copy and paste the permission setting. 
Bucket Policy for the AWS S3:
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
       "Sid": "PublicReadGetObject",
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::google-sheet-shop-dev/*"
    }
  ]
}
```
Enable static hosting and set the index document as index.html.
