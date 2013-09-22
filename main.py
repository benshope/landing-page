import webapp2
import os
import json
import cgi
import urllib
from google.appengine.api import mail

class SendMail(webapp2.RequestHandler):
  def post(self):
    mail.send_mail(sender="{0} <{1}>".format(self.request.get('name'), self.request.get('email')),
                  to="Ben Shope <nimajnebs@gmail.com>",
                  subject="Senior Spring Contact Form Message",
                  body=self.request.get('message'))
    
app = webapp2.WSGIApplication([
  ('/mail', SendMail)
])