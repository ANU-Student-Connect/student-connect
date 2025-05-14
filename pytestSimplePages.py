import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time


@pytest.fixture(scope="module")
def driver():
    driver = webdriver.Chrome()
    yield driver
    driver.quit()


@pytest.mark.smoke
def test_login_page(driver):
    driver.get("http://localhost:3000/login")
    print(driver.title)
    print(driver.current_url)
    print(driver.window_handles)
    assert "Student Connect" in driver.title
    email_input = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
    password_input = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
    assert email_input.is_displayed()
    assert password_input.is_displayed()


@pytest.mark.signup
def test_signup_page(driver):
    driver.get("http://localhost:3000/signup")
    assert "Student Connect" in driver.page_source
    first_name_input = driver.find_element(By.ID, "firstName")
    last_name_input = driver.find_element(By.ID, "lastName")
    assert first_name_input.is_displayed()
    assert last_name_input.is_displayed()


@pytest.mark.userprofile
def test_userprofile_page(driver):
    driver.get("http://localhost:3000/userprofile")
    assert "Student Connect" in driver.title
    avatar = driver.find_element(By.CSS_SELECTOR, "img[src*='defaultavater.png']")
    assert avatar.is_displayed()
