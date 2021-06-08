<?php

namespace App\Controller;

use App\Repository\TurnosPredefinidosRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/turnos/predefinidos", name="turnos_predefinidos_")
 */
class TurnosPredefinidosController extends AbstractController
{
    /**
     * @Route("/listar", name="listar")
     */
    public function index(TurnosPredefinidosRepository $predefinidosRepository): Response
    {
        $predefinidos = $predefinidosRepository->findAll();
        return $this->render('turnos_predefinidos/gestiona.html.twig', [
            'turnos' => $predefinidos
        ]);
    }
}
