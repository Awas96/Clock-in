<?php

namespace App\Controller;

use App\Repository\UsuarioRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/usuarios", name="usuarios_")
 */
class UsuariosController extends AbstractController
{
    /**
     * @Route("/listar", name="listar")
     */
    public function listar(UsuarioRepository $usuarioRepository): Response
    {
        $usuarios = $usuarioRepository->findAll();
        return $this->render('usuarios/gestiona.html.twig', [
            'controller_name' => 'Gestionar Usuarios',
            'usuarios' => $usuarios
        ]);
    }

}
