from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from users.models import EmailLog
def send_email(subject, recipient_list, template_name, context=None, from_email=None):
    """
    Отправка письма с HTML-шаблоном.

    :param subject: Тема письма
    :param recipient_list: Список получателей
    :param template_name: Имя HTML-шаблона (например, 'emails/order_confirmation.html')
    :param context: Контекст для шаблона (словарь)
    :param from_email: Отправитель (по умолчанию DEFAULT_FROM_EMAIL)
    """
    if context is None:
        context = {}

    if from_email is None:
        from_email = settings.EMAIL_HOST_USER


    html_message = render_to_string(template_name, context)
    

    text_message = strip_tags(html_message)

    email = EmailMultiAlternatives(
        subject=subject,
        body=text_message,
        from_email=from_email,
        to=recipient_list,
    )
    
    email.attach_alternative(html_message, "text/html")

    email.send(fail_silently=False)
    
    EmailLog.objects.create(subject=subject, message=text_message, recipient=", ".join(recipient_list))