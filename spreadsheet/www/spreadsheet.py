import frappe


def get_context(context):
    if frappe.session.user == "Guest":
        frappe.local.flags.redirect_location = "/login?redirect-to=/spreadsheet"
        raise frappe.Redirect

    context.no_cache = 1
