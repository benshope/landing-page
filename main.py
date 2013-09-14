import webapp2
import os
import json
import cgi
import urllib
from google.appengine.api import mail


class SendMail(webapp2.RequestHandler):
  def post(self):
    name = '{0} {1}'.format(self.request.get('name'), self.request.get('email'))
    email = self.request.get('email')
    message = self.request.get('message')
    mail.send_mail(sender=self.request.get('sender'),
                  to="Senior Spring Design <info@seniorspring.com>",
                  subject="Senior Spring Contact Form Message",
                  body=self.request.get('message'))
    

app = webapp2.WSGIApplication([
  ('/mail', SendMail)
])