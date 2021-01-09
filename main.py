from flask import Flask, render_template, request, jsonify
import aiml
import os
from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse , Media
import time
import webbrowser
import socket
import requests
from ipwhois import IPWhois
import time
import datetime

resp1 = MessagingResponse()



app = Flask(__name__)


@app.route("/")
def hello():
    return render_template('chat.html')


@app.route("/ask", methods=['POST'])
def ask():
    message = request.form['messageText'].encode('utf-8').strip()

    kernel = aiml.Kernel()

    if os.path.isfile("bot_brain.brn"):
        kernel.bootstrap(brainFile="bot_brain.brn")
    else:
        kernel.bootstrap(learnFiles=os.path.abspath("aiml/std-startup.xml"), commands="load aiml b")
        kernel.saveBrain("bot_brain.brn")

    # kernel now ready for use
    while True:
        if message == "quit":
            exit()
        elif message == "save":
            kernel.saveBrain("bot_brain.brn")
        else:
            bot_response = kernel.respond(message)
            # print bot_response
            return jsonify({'status': 'OK', 'answer': bot_response})

        # whatsapp


@app.route("/sms", methods=['GET','POST'])
def sms_reply():
    """Respond to incoming calls with a simple text message."""
    # Fetch the message
    msg = request.form.get('Body')
    num_media = request.values.get("NumMedia")
    print(num_media)
    Chrome_Image = "https://4.bp.blogspot.com/-Nyfdpymc_Lo/VkQw-nJ79mI/AAAAAAAARYg/6o9VeoTvu-I/s1600-r/logo_chrome.png"
    video = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    kernel = aiml.Kernel()
    print(msg)
        


    if os.path.isfile("bot_brain.brn"):
        kernel.bootstrap(brainFile="bot_brain.brn")
    else:
        kernel.bootstrap(learnFiles=os.path.abspath("aiml/std-startup.xml"), commands="load aiml b")
        kernel.saveBrain("bot_brain.brn")

    while True:
        if msg == "open chrome":
            webbrowser.open_new_tab("http://www.google.com")
            if(True):
               two = resp1.message(format(str("chrome opened")))
               two.media(Chrome_Image)
            return str(resp1)
        if msg == "create folder":
            folder = request.form.get('Body')
            print(folder)
            if(True):
                os.mkdir(msg)
                resp1.message(format(str("folder created")))
            return str(resp1)
        if msg == "track my ip":
                hostname = socket.gethostname()    
                IPAddr = requests.get('http://ip.42.pl/raw').text
                print(IPAddr)   
                obj = IPWhois('216.58.200.142')
                data = obj.lookup_whois()
                if(True):
                   msg1 = resp1.message(format(str(data)))
                   msg1.media("https://kinsta.com/wp-content/uploads/2017/09/external-ip-address-1.png")

                return str(resp1)     

        if msg == "send bill":
            x = datetime.datetime.now()
            bill_url = "https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf"
            if(True):
                pdf = resp1.message("bill generated")
                pdf.media(bill_url)
            return str(resp1)
        if msg == "send video":
            if(True):
                video1 = resp1.message("Message Video send")
                video1.media(video)
            return str(resp1)        
        elif msg == "save":
            kernel.saveBrain("bot_brain.brn")
        else:
            resp = MessagingResponse()
            bot_response = kernel.respond(msg)
            resp.message(format(kernel.respond(msg)))

        return str(resp)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
